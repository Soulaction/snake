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

  static measureByMarks(start: string, end: string): PerformanceEntry | null {
    const marks = this.markList()
    if (marks.indexOf(start) === -1 || marks.indexOf(end) === -1) {
      return null
    }

    const selectedMarks = marks.filter(
      mark => [start, end].indexOf(mark) !== -1
    )

    if (selectedMarks.length < 2) {
      return null
    }

    return performance.measure(
      `Замер производительности между '${start}' и '${end}'`,
      {
        start,
        end,
        detail: {
          markStart: start,
          markEnd: end,
        },
      }
    )
  }
}
