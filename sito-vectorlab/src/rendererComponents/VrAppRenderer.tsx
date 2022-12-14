import React from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  DirectionalLight,
  BoxGeometry,
  MeshNormalMaterial,
  Vector2,
  Vector3,
  Object3D,
} from "three";
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class VrAppRenderer extends React.Component{

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
  geometry!: BoxGeometry;
  
  
  //Rotation variables

  xMax = Math.PI/4;
  xMin = -Math.PI/4;
  yMax = Math.PI/4;
  yMin = -Math.PI/4;
  mouse = new Vector2;

  P = new Vector3(0,0,0);
  T = new Vector3();


  componentDidMount(): void {

    this.renderer = new WebGLRenderer({ canvas: this.myCanvas, alpha:true, antialias:true});
    this.renderer.autoClear = true;
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(50, 1, 0.1, 1000);
    this.camera.position.set(0, 0, 4);
    this.light = new DirectionalLight(0xffffff, 1.0);
    this.light.position.set(5, 4, 0);
    this.scene.add(this.light);
    this.material = new MeshNormalMaterial;
    this.geometry = new BoxGeometry(3, 3, 3);
    this.vrModel = new Mesh (this.geometry, this.material);
    this.renderer.setSize(this.myCanvas.width, this.myCanvas.height);    
    this.update();

    this.loader.load('/models/vr-page-model.glb',(gltfScene) => {

      this.loadedModel = gltfScene.scene.children[0];
      this.scene.add(this.loadedModel);
    })

    //Collect Mouse data

    this.myCanvas.addEventListener("mousemove", e => { 

      this.mouse.x = Math.max(Math.min(-(e.clientY / window.innerHeight) * 2 + 1,this.yMax),this.yMin);
      this.mouse.y = Math.max(Math.min(((e.clientX / window.innerWidth) * 2 - 1),this.xMax),this.xMin);
    })
  }

  componentWillUnmount(): void {

    //Dispose of the scene upon unmount
    
    this.scene.clear();
    this.material.dispose();
    this.geometry.dispose();
    this.renderer.dispose();
  }


  private update(): void {

    requestAnimationFrame(this.update.bind(this));

    this.P = this.P.add(this.T.sub(this.P).multiplyScalar(1/16));
    this.T.y = this.mouse.x;
    this.T.x = this.mouse.y;
    this.T.z = 4;

    //Animation

    if(this.loadedModel){

      this.loadedModel.lookAt(this.P);
      this.loadedModel.rotateOnAxis(new Vector3(1, 0, 0), -Math.PI/2);

    }
    
    this.renderer.render(this.scene, this.camera);
  }

  render(){

    return (
      
      <div className='canvas-container'>
        <canvas className="canvas" height={1920} width={1080} ref={(canvasRef) => { this.myCanvas = canvasRef! }}></canvas>
      </div>
    );
  }
}
export default VrAppRenderer;