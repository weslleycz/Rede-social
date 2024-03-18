import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getNotifications(id: string) {
    const notifications = await this.prismaService.notification.findMany({
      where: { userId: id, read: false },
    });
    return notifications.reverse();
  }

  async deleteNotifications(id: string) {
    return await this.prismaService.notification.update({
      where: {
        id,
      },
      data: {
        read: true,
      },
    });
  }
}
