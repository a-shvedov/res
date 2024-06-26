test(function() {
    self.performance.mark("mark1");
    self.performance.mark("mark2");
    var entries = self.performance.getEntriesByType("mark");
    assert_equals(entries.length, 2, "Two marks have been created for this test.");
    self.performance.clearMarks("mark1");
    entries = self.performance.getEntriesByName("mark1");
    assert_equals(entries.length, 0,
              "After a call to self.performance.clearMarks(\"mark1\"), " +
              "window.performance.getEntriesByName(\"mark1\") returns an empty object.");
    entries = self.performance.getEntriesByName("mark2");
    assert_equals(entries[0].name, "mark2",
              "After a call to self.performance.clearMarks(\"mark1\"), " +
              "window.performance.getEntriesByName(\"mark2\") returns an object containing the " +
              "\"mark2\" mark.");
}, "Clearing an existent mark doesn't affect other existing marks");
