import React from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  DirectionalLight,
  MeshNormalMaterial,
  Vector2,
  AxesHelper,
  Object3D,
  SphereGeometry,
  Vector3,
} from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class GameDevRenderer extends React.Component{


  //imported 3d model

  loader = new GLTFLoader();
  loadedModel!: Object3D;

  ////Scene elements
  
  myCanvas!: HTMLCanvasElement;
  renderer!: WebGLRenderer;
  scene!: Scene;
  camera!: PerspectiveCamera;
  vrModel!: Mesh;
  light!: DirectionalLight;
  material!: MeshNormalMaterial;
  geometry!: SphereGeometry;
  enemiesArray:Mesh[] = [];
  enemy!: Mesh;
  rect!: DOMRect;
  
  //Rotation variables
  FOV = 50;
  SMXx!: number;
  SMXy!: number;
  Ax!: number;
  Ay!: number;
  X = new Vector2(0, 0);
  mouse = new Vector2(0, 0);
  oldMouse = new Vector2(0, 0);
  radius = 5;
  degreePerPixel!: number;
  P = new Vector2(0,0);


  componentDidMount(): void {

    this.rect = this.myCanvas.getBoundingClientRect();;
    this.degreePerPixel = this.FOV / this.rect.width;
    const axesHelper = new AxesHelper( 500 );
    this.renderer = new WebGLRenderer({ canvas: this.myCanvas, alpha:true, antialias:true});
    this.renderer.autoClear = true;
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(this.FOV);
    this.camera.position.set(0, 0, this.radius);
    this.light = new DirectionalLight(0xffffff, 1.0);
    this.light.position.set(5, 4, 0);
    this.material = new MeshNormalMaterial;
    this.geometry = new SphereGeometry(0.3, 30, 30);
    console.log(this.rect.left);
    console.log(this.rect.right);
    console.log(this.rect.top);
    console.log(this.rect.bottom);

    for (let i = 0; i < 5; i++) {
      
      this.enemiesArray[i] = new Mesh(this.geometry, this.material);
      
    }

    this.renderer.setSize(this.myCanvas.width, this.myCanvas.height);        
    this.scene.add(this.light, axesHelper);

    this.loader.load('/low_poly_spaceship.glb',(gltfScene) => {

      this.loadedModel = gltfScene.scene.children[0];
      this.scene.add(this.loadedModel);
      
      this.loadedModel.scale.set(0.04, 0.04, 0.04);
      this.loadedModel.rotation.set(0, 0, 0);
      this.loadedModel.position.set(0, 0, 0);
      
    })
    
    this.spawnSystem();
    this.update();

    //Collect Mouse data

    this.myCanvas.addEventListener("mousemove", e => { 

      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;  
    })
  }

  componentWillUnmount(): void {
    
    this.scene.clear();
    this.material.dispose();
    this.geometry.dispose();
    this.renderer.dispose();
  }

  //Animation

  private update(): void {

    requestAnimationFrame(this.update.bind(this));  
    
   
  if(this.loadedModel){
  
    this.SMXx = (this.mouse.x - this.rect.left) - (this.rect.width/2);
    this.Ax = this.degreePerPixel * this.SMXx;
    this.X.x = Math.tan(this.Ax* Math.PI / 180)*this.radius;

    this.SMXy = (this.mouse.y - this.rect.top) - (this.rect.height/2);
    this.Ay = this.degreePerPixel * this.SMXy;
    this.X.y = -Math.tan(this.Ay* Math.PI / 180)*this.radius;

    const delta = new Vector2().copy(this.X).sub(this.P);
    this.P.add(delta.multiplyScalar(1/16));
    this.loadedModel.position.set(this.P.x, this.P.y-0.5, 0);
    this.renderer.render(this.scene, this.camera);

    this.loadedModel.rotation.z = -((this.X.x - this.loadedModel.position.x)/12)
    this.loadedModel.rotation.x = (((this.X.y - this.loadedModel.position.y)/10)-Math.PI/2)
    
  }


  for(let i = 0; i < 5; i++){

    if(this.enemiesArray[i].position.z > 29.7) {

      this.enemiesArray[i].position.x = (Math.random() *5) * Math.random() < 0.5 ? -1 : 1;
      this.enemiesArray[i].position.y = (Math.random() *5) * Math.random() < 0.5 ? -1 : 1;
      this.enemiesArray[i].position.z = -(Math.random() *250) + 100;
    }
    this.enemiesArray[i].position.z += 0.3;
  }

  }

  private spawnSystem(): void {
    

    
  for(let i = 0; i < 5; i++){

    this.enemiesArray[i].position.x = (Math.random() *5) * Math.random() < 0.5 ? -1 : 1;
    this.enemiesArray[i].position.y = (Math.random() *5) * Math.random() < 0.5 ? -1 : 1;
    this.enemiesArray[i].position.z = -(Math.random() *100) + 100;
    this.scene.add(this.enemiesArray[i]);
    }

  }

  render(){

    return (
      
      <div className='canvas-container'>
        <canvas className="canvas" height={1920} width={1080} ref={(canvasRef) => { this.myCanvas = canvasRef! }}></canvas>
      </div>
    );
  }
}
export default GameDevRenderer;