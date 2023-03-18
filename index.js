const ffmpeg = require('fluent-ffmpeg');

let argv = process.argv;
let path, outName='out.mp4', fps=30, imgtype='%4d.jpg';
for (let i=2; i<argv.length; i++) {
    console.log(argv[i])
    switch (argv[i]) { 
        case "--help":
            console.log(`
            Usage:
            npm run convert -- --path path/to/imgfolder 
                                [--out output_mp4_name (default out.mp4)
                                --imgtype img_name (default: %4d.jpg)
                                --fps fps (default: 30)]
            `);
            process.exit(0);
        case "--path": 
            path=argv[++i]; 
            break; 
        case "--out": 
            outName=argv[++i]; 
            break; 
        case "--fps":
            fps=argv[++i]; 
            break; 

        case "--imgtype":
            imgtype=argv[++i]; 
            break; 

    }
}
if (path == undefined) {
    console.log('NO FOLDER PROVIDED!');
    process.exit(0);
}


ffmpeg(`${path}/${imgtype}`)
  .fps(fps)
  .videoCodec('libx264')
  .outputOptions('-pix_fmt', 'yuv420p')
  .output(outName)
  .on('end', function() {
    console.log('Conversion complete');
  })
  .run();