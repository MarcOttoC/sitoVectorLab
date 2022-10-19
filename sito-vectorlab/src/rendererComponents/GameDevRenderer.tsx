import React from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  DirectionalLight,
  MeshNormalMaterial,
  Vector2,
  BoxGeometry,
  AxesHelper,
} from "three";

class GameDevRenderer extends React.Component{

  ////Scene elements
  
  myCanvas!: HTMLCanvasElement;
  renderer!: WebGLRenderer;
  scene!: Scene;
  camera!: PerspectiveCamera;
  vrModel!: Mesh;
  light!: DirectionalLight;
  material!: MeshNormalMaterial;
  geometry!: BoxGeometry;
  cube!: Mesh;
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
  radius = 30;
  degreePerPixel!: number;
  P = new Vector2(0,0);


  componentDidMount(): void {

    this.rect = this.myCanvas.getBoundingClientRect();;
    this.degreePerPixel = this.FOV / this.rect.width;
    const axesHelper = new AxesHelper( 500 );
    this.renderer = new WebGLRenderer({ canvas: this.myCanvas, /*alpha:true,*/ antialias:true});
    this.renderer.autoClear = true;
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(this.FOV);
    this.camera.position.set(0, 0, this.radius);
    this.light = new DirectionalLight(0xffffff, 1.0);
    this.light.position.set(5, 4, 0);
    this.material = new MeshNormalMaterial;
    this.geometry = new BoxGeometry(11, 1, 12);
    this.cube = new Mesh(this.geometry, this.material);
    this.cube.position.x = 0;
    this.cube.position.y = 0;
    this.renderer.setSize(this.myCanvas.width, this.myCanvas.height);        
    this.scene.add(this.light, this.cube, axesHelper);
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
    
   

    this.SMXx = (this.mouse.x - this.rect.left) - (this.rect.width/2);
    this.Ax = this.degreePerPixel * this.SMXx;
    this.X.x = Math.tan(this.Ax* Math.PI / 180)*this.radius;

    this.SMXy = (this.mouse.y - this.rect.top) - (this.rect.height/2);
    this.Ay = this.degreePerPixel * this.SMXy;
    this.X.y = -Math.tan(this.Ay* Math.PI / 180)*this.radius;

    const delta = new Vector2().copy(this.X).sub(this.P);
    this.P.add(delta.multiplyScalar(1/16));
    this.cube.position.set(this.P.x, this.P.y, 0);
    this.renderer.render(this.scene, this.camera);

    this.cube.rotation.z = -((this.X.x - this.cube.position.x)/12)
    this.cube.rotation.x = ((this.X.y - this.cube.position.y)/12)

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