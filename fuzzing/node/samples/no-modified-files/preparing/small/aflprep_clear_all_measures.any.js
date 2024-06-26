test(function()
{
    self.performance.mark("mark1");
    self.performance.measure("measure1", "mark1");
    self.performance.mark("mark2");
    self.performance.measure("measure2", "mark2");
    var entries = self.performance.getEntriesByType("measure");
    assert_equals(entries.length, 2, "Two measures have been created for this test.");
    self.performance.clearMeasures();
    entries = self.performance.getEntriesByType("measure");
    assert_equals(entries.length, 0,
              "After a call to self.performance.clearMeasures(), " +
              "self.performance.getEntriesByType(\"measure\") returns an empty object.");
}, "Clearing all marks remove all of them.");
