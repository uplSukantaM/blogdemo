export default {
	title: "User",
	name: "user",
	type: "document",
	fields: [
		{
			title: "First Name",
			name: "firstName",
			type: "string"
		},
		{
			title: "Last Name",
			name: "lastName",
			type: "string"
		},
		{
			title: "Email",
			name: "email",
			type: "string"
		},
		{
			title: "Password",
			name: "password",
			type: "string"
		},
		{
			title: "Role",
			name: "role",
			type: "string",
			default: "user",
			options: {
				list: [
					{ title: "Admin", value: "admin" },
					{ title: "Manager", value: "manager" },
					{ title: "User", value: "user" }
				]
			}
		}
	]
}