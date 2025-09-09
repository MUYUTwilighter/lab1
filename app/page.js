"use client";

import {useEffect, useState} from "react";
import {convert} from "@/lib/currency";
import {
    Box, Button,
    Container,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

export const CURRENCIES = [
    "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD"
];

export default function Home() {
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("CNY");
    const [amount, setAmount] = useState(1);
    const [result, setResult] = useState(NaN);

    useEffect(() => {
        if (Number.isFinite(amount)) {
            convert(amount, from, to).then(result => setResult(result)).catch(() => setResult(NaN));
        } else {
            setResult(NaN);
        }
    }, [from, to, amount]);

    return <Container maxWidth="sm" sx={{py: 6}}>
        <Paper elevation={3} sx={{p: 4, borderRadius: 4}}>
            <Stack spacing={3}>
                <Box>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                        Currency Conversion
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Select the currencies and enter a value to convert between them.
                    </Typography>
                </Box>

                <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
                    <FormControl fullWidth>
                        <InputLabel id="from-scale-label">From Scale</InputLabel>
                        <Select
                            labelId="from-scale-label"
                            value={from}
                            label="Base Currency"
                            onChange={e => setFrom(e.target.value)}
                            variant={"outlined"}>
                            {CURRENCIES.map((c) => (
                                <MenuItem key={c} value={c}>
                                    {c}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button onClick={() => {
                        setFrom(to);
                        setTo(from);
                    }}>
                        ⇄
                    </Button>

                    <FormControl fullWidth>
                        <InputLabel id="to-scale-label">To Scale</InputLabel>
                        <Select
                            labelId="to-scale-label"
                            value={to}
                            label="Target Currency"
                            onChange={e => setTo(e.target.value)}
                            variant={"outlined"}>
                            {CURRENCIES.map((s) => (
                                <MenuItem key={s} value={s}>
                                    {s}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>

                <TextField
                    label="Input Value"
                    type="number"
                    fullWidth
                    value={Number.isFinite(amount) ? amount : ""}
                    onChange={(e) => {
                        const v = e.target.value;
                        if (v === "") {
                            setAmount(NaN);
                            return;
                        }
                        const n = Number(v);
                        setAmount(n);
                    }}
                    error={!Number.isFinite(amount)}
                    helperText={!Number.isFinite(amount) ? "Not a valid number" : ""}
                />

                <Divider/>

                <Box>
                    <Typography variant="overline" color="text.secondary">
                        Result
                    </Typography>
                    <Typography variant="h4" fontWeight={800} sx={{wordBreak: "break-all"}}>
                        {Number.isFinite(result) ? Math.round(result * 100) / 100 : "—"}
                    </Typography>
                </Box>
            </Stack>
        </Paper>
    </Container>;
}
