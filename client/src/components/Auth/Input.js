import React from 'react'
import { TextField, Grid, IconButton, InputAdornment } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ name, label, handleChange, half, autoFocus, handleShowPassword, type }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                variant="outlined"
                type={type}
                label={label}
                required
                fullWidth
                autoFocus={autoFocus}
                onChange={handleChange}
                xs={6}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>{type === "password" ? <Visibility /> : <VisibilityOff />}</IconButton>
                        </InputAdornment>
                    )
                } : null}
            />
        </Grid>
    )
}

export default Input
