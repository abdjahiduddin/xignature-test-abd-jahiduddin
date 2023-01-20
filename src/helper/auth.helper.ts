import { UnauthorizedException } from '@nestjs/common';

export const isAuthorized = (id: string, authUserId: string): void => {
  if (id !== authUserId) {
    throw new UnauthorizedException('Not authorized to perform this task');
  }
};
