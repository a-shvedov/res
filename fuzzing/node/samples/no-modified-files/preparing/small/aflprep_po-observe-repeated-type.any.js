async_test(function (t) {
  const observer  = new PerformanceObserver(
      t.step_func(function (entryList) {
        checkEntries(entryList.getEntries(),
          [{ entryType: "mark", name: "early"}]);
        observer.disconnect();
        t.done();
      })
    );
  performance.mark("early");
  observer.observe({type: "mark"});
  observer.observe({type: "mark", buffered: true});
}, "Two calls of observe() with the same 'type' cause override.");
