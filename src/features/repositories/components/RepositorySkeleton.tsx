import { Card, CardContent, Skeleton, Box } from '@mui/material';

export const RepositorySkeleton = () => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Skeleton variant="text" width="80%" height={28} />
      <Skeleton variant="text" width="100%" height={20} sx={{ mt: 1 }} />
      <Skeleton variant="text" width="100%" height={20} />
      <Skeleton variant="text" width="60%" height={20} />
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
      </Box>
    </CardContent>
  </Card>
);
