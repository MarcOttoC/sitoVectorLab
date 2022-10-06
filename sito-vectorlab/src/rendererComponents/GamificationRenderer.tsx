import React from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  DirectionalLight,
  MeshNormalMaterial,
  SphereGeometry,
} from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



class GamificationRenderer extends React.Component{

  myCanvas!: HTMLCanvasElement;
  renderer!: WebGLRenderer;
  scene!: Scene;
  camera!: PerspectiveCamera;
  sphere!: Mesh;
  light!: DirectionalLight;
  material!: MeshNormalMaterial;
  geometry!: SphereGeometry;

  componentDidMount(): void {

    this.renderer = new WebGLRenderer({ canvas: this.myCanvas, alpha:true, antialias:true});
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(50, 1, 0.1, 1000);
    this.camera.position.set(20, 10, 20);
    this.light = new DirectionalLight(0xffffff, 1.0);
    this.light.position.set(5, 4, 0);
    var orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.scene.add(this.light);
    this.update();
    this.material = new MeshNormalMaterial;
    this.geometry = new SphereGeometry(9, 30, 30);
    this.sphere = new Mesh(this.geometry, this.material);
    this.scene.add(this.sphere);
    this.renderer.setSize(this.myCanvas.width, this.myCanvas.height);    

  }

  componentWillUnmount(): void {
    this.scene.clear();
    this.material.dispose();
    this.geometry.dispose();
    this.renderer.dispose();
  }

  private update(): void {

    requestAnimationFrame(this.update.bind(this));
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
export default GamificationRenderer;