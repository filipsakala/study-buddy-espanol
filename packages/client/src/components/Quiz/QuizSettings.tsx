import { Settings } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  FormControl,
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
  maxWidth: "85%",
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
  const setFilterCourses = useContextSelector(
    QuizContext,
    (c) => c.setFilterCourses
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

  const handleChangeCourses = useCallback((course: string) => {
    setFilterCourses([course]);
  }, []);

  return (
    <>
      <Button variant="contained" onClick={handleOpen} startIcon={<Settings />}>
        Quiz settings
      </Button>
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" mb={1}>
            Settings
          </Typography>

          {codetables?.courses?.map((c) => (
            <Chip
              key={c}
              variant="outlined"
              label={c}
              clickable
              onClick={() => handleChangeCourses(c)}
              color={filter?.courses?.includes?.(c) ? "success" : "info"}
            />
          ))}

          <FormControl sx={{ m: 1, mb: 2, width: "100%" }}>
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
              {codetables?.learnGroups?.map((learnGroup) => (
                <MenuItem key={learnGroup} value={learnGroup}>
                  {learnGroup}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button onClick={handleClose} variant="contained" color="success">
            Save and close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default QuizSettings;
