import { Settings } from "@mui/icons-material";
import {
  Box,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { QuizContext } from "../../contexts/QuizContextProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const QuizSettings = () => {
  const filter = useContextSelector(QuizContext, (c) => c.filter);
  const setFilterLearnGroups = useContextSelector(
    QuizContext,
    (c) => c.setFilterLearnGroups
  );
  const codetables = useContextSelector(QuizContext, (c) => c.codetables);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleChangeLearnGroups = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      setFilterLearnGroups(event.target.value as string[]);
    },
    []
  );

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Settings />
      </IconButton>
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Settings
          </Typography>

          <Chip variant="outlined" label="Curso A1" />

          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="learn-groups" sx={{ width: "auto" }}>
              Learn groups
            </InputLabel>
            <Select
              labelId="learn-groups"
              multiple
              value={filter.learnGroups}
              onChange={handleChangeLearnGroups}
              input={<OutlinedInput label="Learn Groups" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {codetables?.learnGroups &&
                codetables.learnGroups.map((learnGroup) => (
                  <MenuItem key={learnGroup} value={learnGroup}>
                    {learnGroup}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
};

export default QuizSettings;
