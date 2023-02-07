import React, {useEffect, useRef} from "react";


function Player() {
    const audioRef = useRef(null);

    useEffect(()=>{
        audioRef.current.play();
    });

    const handlePlay = () => {
        audioRef.current.play();
        console.log("🎵재생🎵");
    };

    const handlePause = () => {
        audioRef.current.pause();
        console.log("⏸중지!");
    };

    return (
        <>
            <audio src="/assets/music.wav" ref={audioRef} controls></audio>
            <br />
            <div style={{ margin: "10px 89px" }}>
                <button onClick={handlePlay}> 🎵 재생 </button>
                <button onClick={handlePause}> ⏸ 중지 </button>
            </div>
        </>
    );
}

export default Player;