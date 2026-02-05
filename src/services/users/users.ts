import { PageOptionsDto } from "@/common/Dto/page-options.dto";
import { OffsetPaginationDto } from "@/common/Dto/offset-pagination.dto";
import { prismaPaginate } from "@/utils/paginate/paginate";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { GetUsersResDto } from "./dto/get-users.dto";
import { prisma } from "@/lib/prisma";
import type { Uuid } from "@/common/types/common.types";
import { API_AUTH } from "@/lib/auth/auth";

export const UserService = {
  async getAllUsers(
    pageOptions: PageOptionsDto
  ): Promise<OffsetPaginationDto<GetUsersResDto> | null> {
    await API_AUTH();
    try {
      // Use your shared Prisma pagination utility
      const pagination = await prismaPaginate("user", pageOptions);

      return pagination as OffsetPaginationDto<GetUsersResDto>;
    } catch (err) {
      console.error("[Get All Users Error]", err);
      return null;
    }
  },

  async getUserById(id: Uuid): Promise<GetUsersResDto | null> {
    await API_AUTH();
    try {
      
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) return null;

      const dto = plainToInstance(GetUsersResDto, user, {
        excludeExtraneousValues: true,
      });

      return instanceToPlain(dto) as GetUsersResDto;
    } catch (error) {
      console.error("[Get User Error]", error);
      return null;
    }
  },
};
