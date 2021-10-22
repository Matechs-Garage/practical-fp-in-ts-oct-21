import * as MR from "@app/exercises/day-3/05-graduation"
import * as HS from "@effect-ts/core/Collections/Immutable/HashSet"
import * as T from "@effect-ts/core/Effect"
import * as Ex from "@effect-ts/core/Effect/Exit"
import { pipe } from "@effect-ts/system/Function"

describe("Mars Rover", () => {
  it("should go forward when pointing north", async () => {
    const result = await T.runPromiseExit(
      MR.move(
        new MR.Rover({
          orientation: new MR.North(),
          position: new MR.Position({
            x: 0 as MR.PositionX,
            y: 9 as MR.PositionY
          })
        }),
        new MR.Planet({
          gridSize: new MR.GridSize({
            width: 10 as MR.Width,
            hight: 10 as MR.Hight
          }),
          obstacles: pipe(
            HS.make<MR.Position>(),
            HS.add(
              new MR.Position({
                x: 0 as MR.PositionX,
                y: 0 as MR.PositionY
              })
            )
          )
        }),
        new MR.GoForward()
      )
    )

    expect(Ex.untraced(result)).toEqual(
      Ex.fail(
        new MR.CollisionDetected({
          obstaclePosition: new MR.Position({
            x: 0 as MR.PositionX,
            y: 0 as MR.PositionY
          }),
          roverPosition: new MR.Position({
            x: 0 as MR.PositionX,
            y: 9 as MR.PositionY
          })
        })
      )
    )
  })
})