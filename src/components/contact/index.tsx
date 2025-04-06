"use client";

import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Stack, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import walkingDestination from "@/src/lottie-animations/destination-walking.json";
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { tokens } from "@/src/locales/tokens";
import MUTATE_MESSAGE from "@/src/mutations/send-message";
import { useMutation } from "@apollo/client";
import dynamic from "next/dynamic";
import toast from 'react-hot-toast';


type FormValues = {
    name: string;
    email: string;
    country: string;
    message: string;
};
const LottieNoSSR = dynamic(() => import("lottie-react"), {
    ssr: false,
});

export const Contact = () => {
    const theme = useTheme();
    const [mutateMesssage, { loading }] = useMutation(MUTATE_MESSAGE);
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            country: "",
            message: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required(t(tokens.required.name)),
            email: Yup.string().email(t(tokens.invalid.email)).required(t(tokens.required.email)),
            country: Yup.string().required(t(tokens.required.country)),
            message: Yup.string().required(t(tokens.required.message)),
        }),
        onSubmit: (values: FormValues) => {
            const toastId = toast.loading(t(tokens.common.saving), { position: "top-right" });
            mutateMesssage({
                variables: {
                    name: values.name,
                    email: values.email,
                    country: values.country,
                    message: values.message,
                },
            }).then((response) => {
                if (response.data) {
                    toast.success(t(tokens.common.success), { id: toastId });
                    formik.resetForm();
                } else {
                    toast.error(t(tokens.common.somethingWentWrong), { id: toastId });
                }
            }).catch((error) => {
                console.error("Error sending message:", error);
                toast.error(t(tokens.common.somethingWentWrong), { id: toastId });
            }).finally(() => {
                toast.dismiss(toastId);
            });
        },
    });

    return (
        <section id="contact" className="section">
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: isMobile ? "none" : "1rem",
                    position: "relative",
                    width: "100%",
                    minHeight: isMobile ? "none" : "700px",
                    flexDirection: isMobile ? "column" : "row",
                }}
            >
                {!isMobile && (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box
                            sx={{
                                width: "80%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <LottieNoSSR
                                animationData={walkingDestination}
                                loop={true}
                                autoplay={true}
                            />
                        </Box>
                    </motion.div>
                )}

                <Box
                    sx={{
                        width: isMobile ? "100%" : "50%",
                        padding: isMobile ? "none" : "1rem",
                        position: isMobile ? "relative" : "absolute",
                        right: 0,
                        minWidth: isMobile ? "100%" : "515px",
                        borderRadius: "1rem",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card
                            sx={{
                                borderRadius: "1rem",
                                backgroundColor: "#000000f7",
                                paddingTop: "2rem",
                                paddingBottom: "2rem",
                                color: theme.palette.primary.main,
                            }}
                        >
                            <CardHeader
                                title={t(tokens.contact.title)}
                                subheader={t(tokens.contact.subtitle)}
                                sx={{
                                    color: theme.palette.primary.main,
                                    textAlign: "left",
                                    "& .MuiCardHeader-title": {
                                        fontSize: "1.5rem",
                                        fontWeight: 700,
                                        paddingBottom: "1rem",
                                    },
                                    "& .MuiCardHeader-subheader": {
                                        fontSize: "1rem",
                                        color: theme.palette.grey[500],
                                        paddingBottom: "0.5rem",
                                    },
                                }}
                            />
                            <CardContent>
                                <form onSubmit={formik.handleSubmit}>
                                    <Stack spacing={2}>
                                        <TextField
                                            fullWidth
                                            id="name"
                                            name="name"
                                            label={t(tokens.common.name)}
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                        />
                                        <Stack direction="row" spacing={2}>
                                            <TextField
                                                fullWidth
                                                id="email"
                                                name="email"
                                                label={t(tokens.common.email)}
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}
                                            />
                                            <TextField
                                                fullWidth
                                                id="country"
                                                name="country"
                                                label={t(tokens.common.country)}
                                                value={formik.values.country}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.country && Boolean(formik.errors.country)}
                                                helperText={formik.touched.country && formik.errors.country}
                                            />
                                        </Stack>
                                        <TextField
                                            fullWidth
                                            id="message"
                                            name="message"
                                            label={t(tokens.common.message)}
                                            multiline
                                            rows={4}
                                            value={formik.values.message}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.message && Boolean(formik.errors.message)}
                                            helperText={formik.touched.message && formik.errors.message}
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                backgroundColor: theme.palette.primary.main,
                                                "&:hover": {
                                                    backgroundColor: theme.palette.primary.dark,
                                                },
                                            }}
                                            disabled={loading}
                                            startIcon={loading ? <CircularProgress size={24} /> : null}
                                        >
                                            {t(tokens.common.submit)}
                                        </Button>
                                    </Stack>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Box>
            </Box>
        </section>
    );
};

export default Contact;
