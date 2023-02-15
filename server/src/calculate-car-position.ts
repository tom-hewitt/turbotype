/**
 * only for straight racetrack
 * @param timeFrames the interval at which the car position is updated.
 * @param currentPosition position of the car when this function is called
 * @returns the position where the car should be now
 */

export function getCarPosition(
    velocity: number, 
    timeFrames: number,
    currentPosition: number

    ): number {

        //distance travelled since the last update
        const distanceTravelled: number = velocity * timeFrames;

        const newPosition: number = currentPosition + distanceTravelled;

        return newPosition;
        ;

}