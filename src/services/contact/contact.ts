import { PageOptionsDto } from "@/common/Dto/page-options.dto";
import { OffsetPaginationDto } from "@/common/Dto/offset-pagination.dto";
import { prismaPaginate } from "@/utils/paginate/paginate";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { GetContactResDto } from "./dto/get-contacts-res.dto";
import { prisma } from "@/lib/prisma";
import { API_AUTH } from "@/lib/auth/auth";

export const ContactService = {
  async getAllContacts(
    pageOptions: PageOptionsDto
  ): Promise<OffsetPaginationDto<GetContactResDto> | null> {
    await API_AUTH();
    try {
      const pagination = await prismaPaginate("contactMessage", pageOptions);

      return pagination as OffsetPaginationDto<GetContactResDto>;
    } catch (err) {
      console.error("Getting contacts error:", err);
      return null;
    }
  },
  async getContactById(id: string): Promise<GetContactResDto | null> {
    await API_AUTH();
    try {
      // Fetch contact by ID
      const contact = await prisma.contactMessage.findUnique({
        where: { id },
      });

      if (!contact) return null;

      // Transform to DTO (to apply @Expose, hide extra fields, etc.)
      const dto = plainToInstance(GetContactResDto, contact, {
        excludeExtraneousValues: true,
      });

      // Convert class instance back to plain object
      return instanceToPlain(dto) as GetContactResDto;
    } catch (error) {
      console.error("[Get Contact Error]", error);
      return null;
    }
  },
};
