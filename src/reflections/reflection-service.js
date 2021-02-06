const ReflectionService = {
	getReflections(db, userid) {
        return db.select("*").from("reflections").where({ userid: userid });
        
	},
	insertReflection(db, newReflection) {
		return db
			.insert(newReflection)
			.into("reflections")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	getById(db, id, userid) {
		return db.select("*").from("reflections").where({ id: id, userid }).first();
	},
	deleteReflection(db, id, userid) {
		return db.from("reflections").where({ id, userid }).delete();
	},
	updateReflection(db, id, updateReflection, userid) {
		return db
			.from("reflections")
			.where({ id, userid })
			.update(updateReflection);
	},
};

module.exports = ReflectionService;
