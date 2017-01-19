describe('modules', function() {
	describe('Sports', function() {
		var sport = new Sport(17, "Sport", false);

		it("should be of type Sport", function() {
			expect(sport).toBeTypeOf('Sport');
		});

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

	describe('Teams', function() {
		var team = new Team(17, "/background", 1, "/logo", "Team", 18, "Stadion");

		it("should be of type Team", function() {
			expect(team).toBeTypeOf('Team');
		});

		it("should contain an _id property", function () {
			expect(team).toHaveProperty('_id');
		});

		it("should contain a background property", function () {
			expect(team).toHaveProperty('background');
		});

		it("should contain a competition property", function () {
			expect(team).toHaveProperty('competition');
		});

		it("should contain a logo property", function () {
			expect(team).toHaveProperty('logo');
		});

		it("should contain a name property", function () {
			expect(team).toHaveProperty('name');
		});

		it("should contain a price property", function () {
			expect(team).toHaveProperty('price');
		});

		it("should contain a stadion property", function () {
			expect(team).toHaveProperty('stadion');
		});
	});
});