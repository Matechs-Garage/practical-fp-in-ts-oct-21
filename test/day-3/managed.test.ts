import * as App from "@app/exercises/day-3/01-managed"
import * as T from "@effect-ts/core/Effect"

describe("Managed", () => {
  it("uses simple managedwith no finalization", async () => {
    const out = await T.runPromiseExit(App.programUsingManagedArray)
    expect(out._tag).toEqual("Success")
  })
})
