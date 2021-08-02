import YouTube, {Options} from 'react-youtube';


export const YoutubeEmbed = ({embedId}: { embedId: string }) => {
    const opts : Options = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
            controls: 0,
            start: 0,
            end: 60,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            showinfo: 1
        }
    };

    return (
        <div>
            <YouTube
                videoId={embedId}
                opts={opts}
            />
        </div>);
}
