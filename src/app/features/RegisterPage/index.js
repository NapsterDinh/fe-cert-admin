// import React, { useState } from "react";
// import { useIntl } from "react-intl";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";

// import Button from "@mui/material/Button";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import Stack from "@mui/material/Stack";

// import homeLanguage from "../../core/msg/home";
// import { register } from "../../core/apis/user";

// const RegisterPage = () => {
//   const { formatMessage } = useIntl();
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const [email, setEmail] = useState(null);
//   const [name, setName] = useState(null);
//   const [password, setPassword] = useState(null);
//   const [confirm, setConfirm] = useState(null);

//   useEffect(() => {
//     (async () => {})();
//   }, []);

//   const onBack = () => {
//     history.replace("login");
//   };

//   const registerUser = async () => {
//     console.log(confirm !== password , !email , !name , !password , !confirm)
//     if (confirm !== password || !email || !name || !password || !confirm) {
//       return;
//     }

//     try {
//       const result = await register({
//         name,
//         email,
//         password,
//       });

//       if (result?.status === 400) {
//         alert(result?.data?.message)
//       }
  
//       if (result.status === 201) {
//         history.replace("login");
//       } 
//     } catch (err) {
//       console.log(err)
//     }

//   };

//   const onChange = (obj, type) => {
//     switch (type) {
//       case "email":
//         setEmail(obj.target.value);
//         break;
//       case "password":
//         setPassword(obj.target.value);
//         break;
//       case "name":
//         setName(obj.target.value);
//         break;
//       case "confirm":
//         setConfirm(obj.target.value);
//         break;
//     }
//   };

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     p: 4,
//   };

//   return (
//     <>
//       <Modal
//         open={true}
//         onClose={() => {}}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             {formatMessage(homeLanguage.registerTitle)}
//           </Typography>
//           <Box
//             component="form"
//             sx={{
//               "& .MuiTextField-root": { m: 1, width: "50ch" },
//             }}
//             noValidate
//             autoComplete="off"
//           >
//             <div>
//               <TextField
//                 onChange={(obj) => onChange(obj, "name")}
//                 error={!name}
//                 id="outlined-search"
//                 label="Name"
//                 type="email"
//               />
//               <TextField
//                 onChange={(obj) => onChange(obj, "email")}
//                 error={!email}
//                 id="outlined-search"
//                 label="Email"
//                 type="text"
//               />
//               <TextField
//                 onChange={(obj) => onChange(obj, "password")}
//                 error={!password}
//                 id="outlined-search"
//                 label="Password"
//                 type="password"
//               />
//               <TextField
//                 onChange={(obj) => onChange(obj, "confirm")}
//                 error={!confirm}
//                 id="outlined-search"
//                 label="Confirm Password"
//                 type="password"
//               />

//               <Stack spacing={3} direction="row-reverse">
//                 <Button onClick={registerUser} variant="contained">
//                   Submit
//                 </Button>
//                 <Button onClick={onBack} variant="outlined">
//                   Back
//                 </Button>
//               </Stack>
//             </div>
//           </Box>
//         </Box>
//       </Modal>
//     </>
//   );
// };
// export default RegisterPage;
