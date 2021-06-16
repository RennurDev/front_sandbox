import calcDistance from './CalcDistance';

export default function HandleCurrentPosition(track, prev_pos, pos, dist) {
    const min_duration = 2000 //ms
    const elapseTime = parseInt((pos.timestamp - prev_pos.timestamp))

    if (elapseTime > min_duration) {
        dist += calcDistance(prev_pos, pos)
        track.push([pos.coords.longitude, pos.coords.latitude])
        prev_pos = pos
    }

    return { track, dist, prev_pos }
}
