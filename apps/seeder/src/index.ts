export default {
	async scheduled(batch, env) {
		console.log(batch, env)
	}
} satisfies ExportedHandler<Env>;
