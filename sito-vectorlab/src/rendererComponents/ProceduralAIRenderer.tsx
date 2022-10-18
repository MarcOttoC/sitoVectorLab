import React from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  DirectionalLight,
  Object3D,
} from "three";
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


class ProceduralAIRenderer extends React.Component{

  myCanvas!: HTMLCanvasElement;
  renderer!: WebGLRenderer;
  scene!: Scene;
  camera!: PerspectiveCamera;
  light!: DirectionalLight;

  //imported 3d model

  faceData: Array<Object3D> = [];
  hairData: Array<Object3D> = [];
  mouthData: Array<Object3D> = [];

  faceModel!: Object3D; 
  hairModel!: Object3D; 
  mouthModel!: Object3D; 
  loader = new GLTFLoader();


  componentDidMount(): void {

    this.renderer = new WebGLRenderer({ canvas: this.myCanvas, alpha:true, antialias:true});
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(50, 1, 0.1, 1000);
    this.camera.position.set(20, 10, 20);
    this.light = new DirectionalLight(0xffffff, 1.0);
    this.light.position.set(5, 4, 0);
    var orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.scene.add(this.light);
    
    this.renderer.setSize(this.myCanvas.width, this.myCanvas.height);  
    this.loadmodels();
   
    setInterval(() => {
    
      this.scene.remove(this.faceModel, this.hairModel, this.mouthModel);
      this.generateHeadModel();
      console.log(this.faceModel)
      this.scene.add(this.faceModel, this.hairModel, this.mouthModel); 
    }, 500);
    
    this.update();
  }

  componentWillUnmount(): void {
    this.scene.clear();
    this.renderer.dispose();
  }

  loadmodels():void{

    this.loader.load('/head-data/face1.glb',(gltfScene) => {
      this.faceData[0] = gltfScene.scene.children[0];
      console.log("entrato?")
    })
    this.loader.load('/head-data/face2.glb',(gltfScene) => {
      this.faceData[1] = gltfScene.scene.children[0];
    })
    this.loader.load('/head-data/hair1.glb',(gltfScene) => {
      this.hairData[0] = gltfScene.scene.children[0];
    })
    this.loader.load('/head-data/hair2.glb',(gltfScene) => {
      this.hairData[1] = gltfScene.scene.children[0];
    })
    this.loader.load('/head-data/mouth1.glb',(gltfScene) => {
      this.mouthData[0] = gltfScene.scene.children[0];
    })
    this.loader.load('/head-data/mouth2.glb',(gltfScene) => {
      this.mouthData[1] = gltfScene.scene.children[0];
    })

  }
  private update(): void {

    requestAnimationFrame(this.update.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  randomNumberInRange(max:number) {

    return Math.floor(Math.random() * (max ));
  }

  generateHeadModel():void {

    this.faceModel = this.faceData[this.randomNumberInRange(this.faceData.length)]
    this.hairModel = this.hairData[this.randomNumberInRange(this.hairData.length)]
    this.mouthModel = this.mouthData[this.randomNumberInRange(this.mouthData.length)]
  }

  render(){

    return (
        
      <div className='canvas-container'>
        <canvas className="canvas" height={1920} width={1080} ref={(canvasRef) => { this.myCanvas = canvasRef! }}></canvas>
      </div>
    );

  }
}
export default ProceduralAIRenderer;

