import { renderHook } from "@testing-library/react";
import useDebounce from "./useDebounce";
import { act } from "react";

describe("useDebounce", () => {
  vi.useFakeTimers();

  it("should debounce value updates", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));

    expect(result.current).toBe("initial");

    act(() => {
      result.current = "new value";
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current).toBe("new value");
  });
});
