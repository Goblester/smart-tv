import YouTube, {Options} from 'react-youtube';
import useWindowSize from '../../utils/useWindowSize';
import {useCallback, useState} from 'react';
import {TimeoutId} from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import st from './YoutubeEmbed.module.scss';
import classNames from 'classnames';
import {useActions} from '../../utils/redux-utils';
import {appActions} from '../Applicaton';

type PlayerType = {
    playVideo: () => void
    pauseVideo: () => void
    setVolume: (volume: number) => void
    getCurrentTime: () => number
}

export const YoutubeEmbed = ({embedId}: { embedId: string }) => {
    //state
    const [videoToggle, setVideoToggle] = useState<boolean>(false);
    const [isInitialized, setInitialised] = useState<boolean>(false);
    const [player, setPlayer] = useState<PlayerType | null>(null);
    const [intervalId, setIntervalId] = useState<TimeoutId | null>(null);
    const {changeCurrentTime} = useActions(appActions)
    const shadowClassName = classNames(st.shadow, {[st.show]: isInitialized});
    const size = useWindowSize();

    //functions
    const onToggleClick = () => {
        if (!videoToggle) {
            player && player.playVideo();

        } else {
            player && player.pauseVideo();
        }
        setVideoToggle(toggle => !toggle);

    }

    const onReady = useCallback ((event: { target: PlayerType }) => {
        setPlayer(event.target);
        setInitialised(true);
        event.target.setVolume(1);
    },[]);


    const onPlay = useCallback (() => {
        if (player) {
            const Id = setInterval(() => {
                changeCurrentTime(player.getCurrentTime())
            }, 100)
            setIntervalId(Id);
        }
    },[changeCurrentTime, player])

    const onStop = useCallback (() => {
        intervalId&&clearInterval(intervalId)
    },[intervalId]);

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
                onPlay={onPlay}
                onPause={onStop}
            />
            <div className={shadowClassName}
                 onClick={onToggleClick}>
            </div>
        </div>
    );
}
