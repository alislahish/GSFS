import GSFS from "./GSFS.js";

var myp5 = new p5(function(sketch){
  const divisionAngle = sketch.PI/2;

  const w = () => sketch.windowWidth;
  const h = () => sketch.windowHeight;
  const zoomScale = 5;
  const alpha = 128;

  const numSequences = 13;
  let metallicsequences = [];
  let spirals = [];
  let colors = [];
  const bgColorFramePeriod = 64;
  const bgcolor = () => 127 + 64 * sketch.sin(sketch.TAU *
    (sketch.frameCount%bgColorFramePeriod)/bgColorFramePeriod);


  function setupMetallicSequences(){
    for(let index = 0; index < numSequences; index++){
      metallicsequences[index] = GSFS.calcGSFS({
        c: 1,
        d: index+1,
      });
    }
  }

  function setupSpirals(params){
    params = params || {};
    const useSequenceRatio = (typeof params.useSequenceRatio === 'boolean')
      ? params.useSequenceRatio
      : true;
    for(let sequenceIndex in metallicsequences){
      // console.log(sequenceIndex)
      const sequence = metallicsequences[sequenceIndex];
      const ratio = (useSequenceRatio)
        ? sequence[RESOLUTION-1]/sequence[RESOLUTION-2]
        : GSFS.metallicRatioByFormula({ p: parseInt(sequenceIndex) + 1 });
      // console.log(sequenceIndex, ratio);
      const colorcomponent = sketch.map(sequenceIndex,
        0, metallicsequences.length,
        0, 255);
      // console.log(ratio);
      spirals[sequenceIndex] = GSFS.calc2DSpiral({
        phiratio: ratio,
      });

      colors[sequenceIndex] = sketch.color(
        colorcomponent,
        colorcomponent,
        colorcomponent,
        alpha);
    }
  }
  // window.import('metallicratia.js');
  function setup() {
    setupMetallicSequences();
    // setupSpirals();
    setupSpirals({useSequenceRatio:false});
    sketch.createCanvas(w(), h());
    // console.log(GSFS.calcGSFS);
    // console.log(GSFS.calcGSFS());
  }
  sketch.setup = setup;

  function windowResized() {
    sketch.resizeCanvas(w(), h());
  }
  sketch.windowResized = windowResized;

  function drawSpirals(params){
    params = params || {};
    const xScale = (typeof params.xScale === 'number')
      ? params.xScale
      : 1;
    const yScale = (typeof params.yScale === 'number')
      ? params.yScale
      : 1;
    for(let spiralIndex in spirals){
      const spiral = spirals[spiralIndex];
      const colorIndex  =( (sketch.frameCount % (2*numSequences)) < numSequences )
        ? sketch.frameCount % numSequences
        : numSequences - 1 - (sketch.frameCount % numSequences);
      // console.log(colorIndex)
      sketch.stroke(colors[colorIndex]);
      for(let pointArrayIndex in spiral.xys){
        const pointArray = spiral.xys[pointArrayIndex];
        if(pointArrayIndex > 0){
          const previousPointArray = spiral.xys[pointArrayIndex-1];
          sketch.line(
            xScale * zoomScale * pointArray[0],
            yScale * zoomScale * pointArray[1],
            xScale * zoomScale * previousPointArray[0],
            yScale * zoomScale * previousPointArray[1]
          );
        }
        // sketch.strokeWeight(1);
        // sketch.fill(bgcolor());
        // sketch.ellipse(
        //   xScale * zoomScale * pointArray[0],
        //   yScale * zoomScale * pointArray[1],
        // 3);
      }
    }
  }

  function drawSpiralSet(){
    sketch.translate(w()/2, h()/2);
    for(let Theta = 0; Theta < sketch.PI; Theta += divisionAngle){
      sketch.rotate(Theta);
      for(let xScale of [-1, 1]){
        for(let yScale of [-1, 1]){

          drawSpirals({xScale, yScale});

        }
      }
    }
  }

  function draw() {
    // background(REPLACE);
    sketch.background(bgcolor());
    // blendMode(DODGE);
    drawSpiralSet();

  }
  sketch.draw = draw;

});
