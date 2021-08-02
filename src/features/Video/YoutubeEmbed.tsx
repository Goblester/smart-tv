import YouTube, {Options} from 'react-youtube';
import useWindowSize from '../../utils/useWindowSize';
import {useEffect, useState} from 'react';
import {TimeoutId} from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import st from './YoutubeEmbed.module.scss';
import classNames from 'classnames';

type PlayerType = {
    playVideo: () => void
    pauseVideo: () => void
    setVolume: (volume: number) => void
}

export const YoutubeEmbed = ({embedId}: { embedId: string }) => {
    const [videoToggle, setVideoToggle] = useState<boolean>(false)
    const size = useWindowSize();
    const [isInitialized, setInitialised] = useState<boolean>(false);
    const [player, setPlayer] = useState<PlayerType | null>(null);
    const shadowClassName = classNames(st.shadow, {[st.show]: isInitialized});

    const onReady = (event: { target: any }) => {
        setPlayer(event.target);
        setInitialised(true);
    };

    useEffect(() => {
        let intervalId: TimeoutId;
        if (player) {
            intervalId = setInterval(() => {
            }, 100)
        }
        return () => clearInterval(intervalId)
    }, [player])

    const onToggleClick = () => {
        if (!videoToggle) {
            player && player.playVideo();
            player && player.setVolume(5);
        } else {
            player && player.pauseVideo();
        }
        setVideoToggle(toggle => !toggle);

    }

    const opts: Options = {
        height: `${size.height}`,
        width: `${size.width}`,
        playerVars: {
            disablekb: 1,
            autoplay: 0,
            controls: 0,
            start: 0,
            end: 60,
            fs: 0,
            iv_load_policy: 1,
            modestbranding: 1,
            showinfo: 0
        }
    };


    return (
        <div className={st.container}>
            <YouTube
                videoId={embedId}
                opts={opts}
                onReady={onReady}

            />
            <div className={shadowClassName}
                 onClick={onToggleClick}>
            </div>
        </div>
    );
}
