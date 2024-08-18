import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { stringToFileConverter } from "../../features/images/stringToFile";
import {
  ProductResponse,
  ProductResponseMessage,
  ProductResponseMessageType,
} from "../../types/apiTypes";
import { CreateItem } from "../../types/types";
export const product = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/items/`,
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    GetAllProducts: builder.query<ProductResponse, void>({
      query: () => `/admin/all`,
      providesTags: ["Product"],
    }),

    CreateProduct: builder.mutation<ProductResponseMessageType, CreateItem>({
      query: (product) => {
        const myForm = new FormData();

        myForm.set("name", product.name!);
        myForm.set("brandName", product.brandName!);
        myForm.set("description", product.description!);

        // Handle single file upload for productImage
        if (product.productImage) {
          const file = stringToFileConverter(product.productImage as any);
          myForm.append("photo", file);
        }

        // Handle multiple file uploads for additionalImages
        if (product.additionalImages && product.additionalImages.length > 0) {
          const additionalImages = product.additionalImages.map(
            (img: any) => img!.file
          );
          myForm.append(`additionalImages`, additionalImages as any);
        }

        // Handle array fields (category, allergens, tags)
        myForm.set("category", JSON.stringify(product.category || []));
        myForm.set("allergens", JSON.stringify(product.allergens || []));
        myForm.set("tags", JSON.stringify(product.tags || []));

        // Handle boolean fields
        myForm.set("deal", product.deal.toString());
        myForm.set("promoCodeOnly", product.promoCodeOnly.toString());
        myForm.set("available", product.available.toString());
        myForm.set("upsellingItem", product.upsellingItem.toString());
        myForm.set("appOnly", product.appOnly.toString());

        // Handle nullable fields
        if (product.deliveryBy) {
          myForm.set("deliveryBy", product.deliveryBy);
        }
        if (product.priceType) {
          myForm.set("priceType", product.priceType);
        }

        // Handle numeric fields
        myForm.set("price", product.price.toString());
        myForm.set("discountType", product.discountType!);
        myForm.set("discountPrice", product.discountPrice.toString());
        myForm.set("preparationTime", product.preparationTime.toString());
        myForm.set("calories", product.calories.toString());
        myForm.set("priority", product.priority.toString());

        // Handle string fields
        myForm.set("barcode", product.barcode);
        myForm.set("sku", product.sku);
        myForm.set("uom", product.uom);
        myForm.set("skuPosMappingId", product.skuPosMappingId);

        console.log(myForm);
        return { url: `post?imgPath=Item`, method: "POST", body: myForm };
      },
      invalidatesTags: ["Product"],
    }),

    DeleteProduct: builder.mutation<ProductResponseMessage, string>({
      query(id) {
        return {
          url: `${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Product"],
    }),
    UpdateProduct: builder.mutation<
      ProductResponseMessageType,
      CreateItem & { id: string }
    >({
      query: (product) => {
        const myForm = new FormData();
        myForm.set("name", product.name!);
        myForm.set("brandName", product.brandName!);
        myForm.set("description", product.description!);

        // Handle single file upload for productImage
        if (product.productImage) {
          const file = stringToFileConverter(product.productImage as any);
          myForm.append("photo", file);
        }

        // Handle multiple file uploads for additionalImages
        if (product.additionalImages && product.additionalImages.length > 0) {
          product.additionalImages
            .filter((img: any) => img && img.file) // Filter out invalid entries
            .forEach((img: any) => {
              const file = img.file as File;
              myForm.append("additionalImages", file); // Append each file under the same key
            });
        }

        // Handle array fields (category, allergens, tags)
        myForm.set("category", JSON.stringify(product.category || []));
        // myForm.set("allergens", JSON.stringify(product.allergens || []));
        myForm.set("tags", JSON.stringify(product.tags || []));

        // Handle boolean fields
        myForm.set("deal", product.deal.toString());
        myForm.set("promoCodeOnly", product.promoCodeOnly.toString());
        myForm.set("available", product.available.toString());
        myForm.set("upsellingItem", product.upsellingItem.toString());
        myForm.set("appOnly", product.appOnly.toString());

        // Handle nullable fields
        if (product.deliveryBy) {
          myForm.set("deliveryBy", product.deliveryBy);
        }
        if (product.priceType) {
          myForm.set("priceType", product.priceType);
        }

        // Handle numeric fields
        myForm.set("price", product.price.toString());
        myForm.set("discountType", product.discountType!);
        myForm.set("discountPrice", product.discountPrice.toString());
        myForm.set("preparationTime", product.preparationTime.toString());
        myForm.set("calories", product.calories.toString());
        myForm.set("priority", product.priority.toString());

        // Handle string fields
        myForm.set("barcode", product.barcode);
        myForm.set("sku", product.sku);
        myForm.set("uom", product.uom);
        myForm.set("skuPosMappingId", product.skuPosMappingId);

        return {
          url: `${product.id}?imgPath=Item`,
          method: "PUT",
          body: myForm,
        };
      },
      invalidatesTags: ["Product"],
    }),
    DeleteImageByIndex: builder.mutation<string, { id: string; index: number }>(
      {
        query: ({ id, index }) => ({
          url: `admin/images/${id}`,
          method: "DELETE",
          body: { index },
        }),
        invalidatesTags: ["Product"],
      }
    ),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeleteImageByIndexMutation,
} = product;
