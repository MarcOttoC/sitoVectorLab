import React from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  DirectionalLight,
  MeshNormalMaterial,
  SphereGeometry,
  Vector2,
  AxesHelper,
} from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';




class ArAppRenderer extends React.Component{

  helper = new AxesHelper (5000)

  myCanvas!: HTMLCanvasElement;
  renderer!: WebGLRenderer;
  scene!: Scene;
  camera!: PerspectiveCamera;
  sphere!: Mesh;
  light!: DirectionalLight;
  material!: MeshNormalMaterial;
  geometry!: SphereGeometry;
  
  rect!: DOMRect

 

  mouse = new Vector2(1,1);
  xMax = Math.PI/4
  xMin = -Math.PI/4
  yMax = Math.PI/4
  yMin = -Math.PI/4

  componentDidMount(): void {

    const FOV = 50
    const degreePerPixel = FOV / window.innerWidth
    //const smx = (e.clientX - this.rect.left) - (window.innerWidth/2)

    this.rect = this.myCanvas.getBoundingClientRect()
    this.renderer = new WebGLRenderer({ canvas: this.myCanvas, /*alpha:true, */antialias:true});
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(FOV);
    this.camera.position.set(0, 0, 300);
    this.light = new DirectionalLight(0xffffff, 1.0);
    this.light.position.set(5, 4, 0);
    //var orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.scene.add(this.light,this.helper);
    this.update();
    this.material = new MeshNormalMaterial;
    this.geometry = new SphereGeometry(4, 30, 30);
    this.sphere = new Mesh(this.geometry, this.material);
    this.scene.add(this.sphere,this.helper);
    this.renderer.setSize(this.myCanvas.width, this.myCanvas.height);    

    this.myCanvas.addEventListener("mousemove", e => { 
     // this.mouse.y = Math.floor((Math.max(Math.min(-(e.clientY / this.myCanvas.height) * 2 + 1,this.yMax),this.yMin))*100)
      //this.mouse.x = Math.floor((Math.max(Math.min(((e.clientX / this.myCanvas.width) * 2 - 1),this.xMax),this.xMin)*100))
      this.sphere.position.x = (e.clientX - this.rect.left);  
     // this.sphere.position.y = -(e.clientY - this.rect.top)/10;
  })

    this.myCanvas.addEventListener("mousedown", e => {

      console.log(e.clientX - this.rect.left,e.clientY - this.rect.top)
    })

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
export default ArAppRenderer;