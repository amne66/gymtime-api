export function upsertGFymController(gyms: any[], newGym: any) {
	const gymIndex = gyms.findIndex((el) => el.id === newGym.id);
	if (gymIndex === -1) {
	gyms.push(newGym);
	} else {
		gyms[gymIndex] = {
			...gyms[gymIndex],
			...newGym,
		};
	}
	return gyms;
}