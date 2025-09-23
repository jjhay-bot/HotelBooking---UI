import { UPDATE_STORE_PROFILE } from "@/gql/mutations";
import { onError } from "@/gql/uiActions";
import useSuccessSubmittion from "@/hooks/useSuccessSubmittion";
import { GA } from "@/utils/analyticsEvents";
import { fireEvent } from "@/utils/fireEvent";
import { useLazyQuery, useMutation, useReactiveVar } from "@apollo/client";
import { GET_GENERATE_PRESIGNED_PUT } from "@gql/queries";
import { storeProfileVar } from "@gql/reactiveVar";

const usePhotoUpload = () => {
  const { onCompleted } = useSuccessSubmittion("Photo");
  const storeProfile = useReactiveVar(storeProfileVar);

  const [updateStoreProfile] = useMutation(UPDATE_STORE_PROFILE);
  const [generatePresignUrl] = useLazyQuery(GET_GENERATE_PRESIGNED_PUT, {
    fetchPolicy: "network-only",
  });

  // Function to upload base64 image to S3 using presigned URL
  const uploadToS3 = async (base64Image, mimeType = "image/jpeg", uploadURL) => {
    if (!uploadURL) {
      throw new Error("No presigned URL available. Call submitPhoto first.");
    }

    try {
      // Convert base64 to blob
      const base64Data = base64Image.split(",")[1]; // Remove data:image/jpeg;base64, prefix
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });

      const response = await fetch(uploadURL, {
        method: "PUT",
        body: blob,
        headers: {
          "Content-Type": mimeType,
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      updateStoreProfile({
        variables: {
          filepath: storeProfile?.username + ".jpeg"
        },
        onCompleted: async () => {
          onCompleted()
          fireEvent(GA.SUBMIT_REQUIREMENT, {
            use_case: "Store Photo",
            module: "photo",
          });
        },
      });
    } catch (error) {
      console.error("Upload error:", error);
      onError("Failed to upload image. Please try again or contact support.");
      throw error;
    }
  };

  const submitPhoto = (base64Image, mimeType = "image/jpeg") => {
    generatePresignUrl({
      variables: {
        uploadType: "STORE_IMAGE",
        mime: mimeType,
        username: storeProfile?.username || "" + ".jpeg",
      },
      onCompleted: async (res) => {
        try {
          // Automatically upload to S3 once presigned URL is ready
          uploadToS3(base64Image, mimeType, res?.generate_presigned_put?.url);
        } catch (uploadError) {
          console.error("Auto-upload failed:", uploadError);
        }
      },
      onError: (error) => {
        console.error("Failed to generate presigned URL:", error);
      },
    });
  };

  return { submitPhoto };
};

export default usePhotoUpload;
