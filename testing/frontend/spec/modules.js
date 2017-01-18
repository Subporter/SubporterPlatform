describe('modules', function() {
	describe('Sports', function() {
		var sport = new Sport(17, "Football", false);

		it("should contain an _id property", function () {
			expect(sport).toHaveProperty('_id');
		});

		it("should contain a name property", function () {
			expect(sport).toHaveProperty('name');
		});

		it("should contain a featured property", function () {
			expect(sport).toHaveProperty('featured');
		});

		it("should return false on the featured property", function() {
			expect(sport.featured).toBe(false);
		});
	});
});