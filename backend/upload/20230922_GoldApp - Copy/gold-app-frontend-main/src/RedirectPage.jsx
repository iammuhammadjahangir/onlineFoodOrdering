import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const RedirectPage = () => {
	return (
		<Box textAlign="center" p={5} mx={30} mt={10} sx={{ border: "4px solid #141414", background: "#9d9e9b" }}>
			<h4>Email Verified Click here to login </h4>

			<Button component={Link} to="/" variant="contained" sx={{ mt: "30px" }}>
				Login
			</Button>
		</Box>
	);
};

export default RedirectPage;
