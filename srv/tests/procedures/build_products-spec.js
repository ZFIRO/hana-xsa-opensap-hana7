/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0, dot-notation:0, no-use-before-define:0 */
/*eslint-env node, es6 */
"use strict";
// use test spec file name as description to allow navigation from the test results view
describe(__filename, () => {
	this.base = __dirname + "/";
	this.test = require("../../utils/tests");

	beforeEach(async(done) => {
		this.db = await this.test.getDBClass(await this.test.getClient());
		this.sp = await this.test.getStoredProc(this.db, "build_products");
		done();
	});

	it("Value Test", async(done) => {
		try {
			let results = await this.db.callProcedurePromisified(this.sp, {});
			expect(results.results.length).not.toBeLessThan(8);
			expect(results.outputScalar.EX_PC_PRODUCTID).toBe("HT-1210");
			expect(results.results[0].PRODUCTID).toBe("ProductB");
			done();

		} catch (err) {
			done.fail(err);
		}
	});
});