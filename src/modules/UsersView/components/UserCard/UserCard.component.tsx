import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Link,
  Box,
  Tooltip,
} from "@mui/material";
import { GitHubUser } from "../../helpers/types";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

export interface UserCardProps {
  user: GitHubUser;
}

export const UserCard = (props: UserCardProps) => {
  const { user } = props;

  return (
    <Card sx={{ width: 220, m: 1 }}>
      <CardHeader
        avatar={<Avatar alt={user.login} src={user.avatar_url} />}
        title={
          <Tooltip title={user.login} placement="top">
            <Typography
              noWrap
              sx={{
                maxWidth: 90,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                cursor: "default",
              }}
            >
              {user.login}
            </Typography>
          </Tooltip>
        }
        subheader={`ID: ${user.id}`}
        action={
          <Link
            href={user.html_url}
            target="_blank"
            rel="noopener"
            underline="none"
          >
            <PersonSearchIcon
              data-testid="user-profile-icon"
              sx={{
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            />
          </Link>
        }
      />
      <CardContent>
        <Box display="flex" flexDirection="column">
          <Typography variant="body2">Type: {user.type}</Typography>
          {user.score !== undefined && (
            <Typography variant="body2">
              Score: {user.score.toFixed(2)}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
