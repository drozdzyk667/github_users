import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Box, Typography } from "@mui/material";
import { FormValues } from "../../helpers/types";
import { schema } from "../../helpers/validations";

export const MIN_SEARCH_USERNAME_LENGTH = 3;

export interface SearchFormComponentProps {
  onHandleSearch: (username: string) => void;
}

export const SearchFormComponent = (props: SearchFormComponentProps) => {
  const { onHandleSearch } = props;

  const {
    control,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { username: "" },
    mode: "onChange",
  });

  const username = watch("username");

  useEffect(() => {
    const trimmed = username.trim();

    if (isValid && trimmed.length >= MIN_SEARCH_USERNAME_LENGTH) {
      const handler = setTimeout(() => {
        handleSubmit((data) => {
          onHandleSearch(data.username.trim());
        })();
      }, 2000);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [username, isValid, handleSubmit, onHandleSearch]);

  return (
    <Box
      sx={{
        maxWidth: 400,
        m: "0 auto",
        p: 2,
      }}
    >
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="GitHub Username"
            variant="outlined"
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
            fullWidth
          />
        )}
      />
      <Typography variant="caption" color="textSecondary" fontSize="10px">
        After you finish typing, please wait 2s, users will be fetched
        automatically
      </Typography>
    </Box>
  );
};
