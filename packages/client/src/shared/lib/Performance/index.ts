export class Measures {
  static period(startTime: number): number {
    return performance.now() - startTime
  }

  static mark(markName: string): void {
    performance.clearMarks(markName)
    performance.mark(markName)
  }

  static markList(): string[] {
    return performance.getEntriesByType('mark').map(entry => entry.name)
  }

  static measure(): PerformanceEntry[] | null {
    const marks = this.markList()

    if (!marks.length) {
      return null
    }

    return marks.map((mark, indx) => {
      const options = {
        start: mark,
        end:
          indx + 1 < marks.length
            ? marks[indx + 1]
            : performance.getEntriesByName(mark)?.shift()?.startTime,
        detail: {
          markStart: mark,
          markEnd: indx + 1 < marks.length ? marks[indx + 1] : null,
        },
      }
      return performance.measure(
        `Замер производительности ${indx + 1}`,
        options
      )
    })
  }
}
