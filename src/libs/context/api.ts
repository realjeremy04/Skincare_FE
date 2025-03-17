import { IQuestion } from "@/libs/types/question.interface";
import { IScoreband } from "@/libs/types/scoreband.interface";
import { IUserQuizResult } from "@/libs/types/userquiz.interface";

// API Configuration
const API_CONFIG = {
  baseURL: "http://localhost:8080/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

// Helper function to construct API URLs
const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.baseURL}/${endpoint.replace(/^\/+/, "")}`;
};

// Helper function to get token from cookies
const getTokenFromCookie = () => {
  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("jwt=")
  );
  const token = tokenCookie ? tokenCookie.split("=")[1] : null;
  console.log("Token from cookie:", token ? "Found" : "Not found");
  return token;
};

// Helper function to get default fetch options
const getDefaultOptions = () => {
  const options: RequestInit = {
    headers: {
      ...API_CONFIG.headers,
    },
    credentials: "include", // This is important for CORS
  };

  const token = getTokenFromCookie();
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
    console.log("Authorization header added");
  } else {
    console.log("No token found, request will be made without authorization");
  }

  return options;
};

// Check authentication status
export const checkAuth = async (): Promise<boolean> => {
  try {
    console.log("Checking authentication...");
    const response = await fetch(getApiUrl("account/profile"), {
      method: "GET",
      ...getDefaultOptions(),
      signal: AbortSignal.timeout(API_CONFIG.timeout),
    });

    console.log("Auth check response status:", response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log("Auth check response data:", data);
      return data && data.user ? true : false;
    }
    
    console.log("Auth check failed with status:", response.status);
    return false;
  } catch (error) {
    console.error("Auth check error:", error);
    return false;
  }
};

// Fetch questions from backend
export const fetchQuestions = async (): Promise<IQuestion[]> => {
  try {
    if (!navigator.onLine) {
      throw new Error(
        "Không có kết nối mạng! Vui lòng kiểm tra kết nối internet của bạn."
      );
    }

    console.log("Fetching questions...", {
      url: getApiUrl("question"),
      config: getDefaultOptions(),
    });

    const response = await fetch(getApiUrl("question"), {
      method: "GET",
      ...getDefaultOptions(),
      signal: AbortSignal.timeout(API_CONFIG.timeout),
    });

    // Log the full response for debugging
    console.log("Full Response:", response);
    console.log(
      "Response Headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (response.status === 204) {
      console.warn(
        "Server returned no content (204). This might mean there are no questions available."
      );
      return [];
    }

    if (!response.ok) {
      let errorMessage;
      try {
        const errorText = await response.text();
        console.error("API Error:", {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
          url: response.url,
        });
        errorMessage = errorText || response.statusText;
      } catch {
        errorMessage = "Unknown error occurred";
      }

      if (response.status === 404) {
        throw new Error("Không tìm thấy câu hỏi. Vui lòng thử lại sau.");
      }

      throw new Error(`Lỗi lấy câu hỏi: ${response.status} - ${errorMessage}`);
    }

    const text = await response.text();
    console.log("Raw response text:", text);

    if (!text) {
      console.warn("Empty response received");
      return [];
    }

    try {
      const data = JSON.parse(text);
      console.log("Parsed data:", data);

      if (!Array.isArray(data)) {
        console.error("Invalid data format:", data);
        throw new Error("Dữ liệu không hợp lệ! (Phải là mảng câu hỏi)");
      }

      return data;
    } catch (parseError) {
      console.error("Failed to parse response:", parseError);
      throw new Error("Dữ liệu không hợp lệ! (Không thể parse JSON)");
    }
  } catch (error: unknown) {
    if (error instanceof TypeError) {
      console.error("Network Error:", {
        message: error.message,
        name: error.name,
        url: getApiUrl("question"),
      });
      throw new Error(
        "Không thể kết nối đến máy chủ. Vui lòng kiểm tra:\n" +
          "1. Máy chủ đã được khởi động chưa?\n" +
          "2. URL máy chủ có đúng không? (" +
          API_CONFIG.baseURL +
          ")\n" +
          "3. Cổng máy chủ có đang hoạt động không?\n" +
          "4. CORS đã được cấu hình đúng trên máy chủ chưa?\n" +
          "5. Máy chủ có trả về dữ liệu không?"
      );
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Có lỗi xảy ra. Vui lòng thử lại sau!");
  }
};

// 🚀 Fetch scoreband based on totalPoints
export const fetchScoreband = async (
  totalPoints: number
): Promise<IScoreband | null> => {
  try {
    console.log("Fetching scoreband for total points:", totalPoints);

    // First, get all scorebands
    const response = await fetch(getApiUrl("scoreband"), {
      method: "GET",
      ...getDefaultOptions(),
      signal: AbortSignal.timeout(API_CONFIG.timeout),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lỗi Fetch Scoreband:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: response.url,
      });
      throw new Error(`Lỗi lấy Scoreband: ${response.status} - ${errorText}`);
    }

    const scorebands = await response.json();
    console.log("Received scorebands:", scorebands);

    if (!Array.isArray(scorebands)) {
      console.error("Invalid scorebands data:", scorebands);
      throw new Error("Dữ liệu Scoreband không hợp lệ! (Expected array)");
    }

    // Find the matching scoreband based on points range
    const matchingScoreband = scorebands.find((band) => {
      const minPoints = band.minPoint || 0;
      const maxPoints = band.maxPoint || Infinity;
      return totalPoints >= minPoints && totalPoints <= maxPoints;
    });

    if (!matchingScoreband) {
      console.warn("No matching scoreband found for points:", totalPoints);
      return null;
    }

    console.log("Found matching scoreband:", matchingScoreband);
    return matchingScoreband;
  } catch (error: unknown) {
    console.error("Scoreband fetch error:", error);

    if (error instanceof TypeError) {
      console.error("Network error fetching scoreband:", {
        message: error.message,
        name: error.name,
      });
      throw new Error(
        "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và thử lại!"
      );
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Có lỗi xảy ra khi lấy Scoreband. Vui lòng thử lại!");
  }
};

// 🚀 Submit quiz results
export const submitQuizResults = async (
  accountId: string,
  results: IUserQuizResult[],
  totalPoint: number,
  scoreBandId: string
): Promise<{ success: boolean }> => {
  try {
    // Validate inputs
    if (!accountId) throw new Error("accountId is required");
    if (!Array.isArray(results) || results.length === 0)
      throw new Error("results must be a non-empty array");
    if (typeof totalPoint !== "number")
      throw new Error("totalPoint must be a number");
    if (!scoreBandId) throw new Error("scorebandId is required");

    // Validate ObjectId format
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    if (!objectIdPattern.test(accountId)) {
      throw new Error(
        "Invalid accountId format. Must be a valid MongoDB ObjectId"
      );
    }
    if (!objectIdPattern.test(scoreBandId)) {
      throw new Error(
        "Invalid scoreBandId format. Must be a valid MongoDB ObjectId"
      );
    }

    // Format payload exactly as backend expects
    const payload = {
      accountId,
      scoreBandId,
      result: results.map((result) => ({
        title: result.title,
        answer: result.answer,
        point: result.point,
      })),
      totalPoint,
    };

    console.log("Submitting quiz results:", {
      url: getApiUrl("userQuiz"),
      payload: JSON.stringify(payload, null, 2),
    });

    const response = await fetch(getApiUrl("userQuiz"), {
      method: "POST",
      ...getDefaultOptions(),
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(API_CONFIG.timeout),
    });

    // Try to read the response text first
    let responseText = "";
    try {
      responseText = await response.text();
      console.log("Raw response:", responseText);
    } catch (readError) {
      console.error("Failed to read response:", readError);
    }

    // Try to parse the response as JSON
    let errorData = null;
    try {
      if (responseText) {
        errorData = JSON.parse(responseText);
      }
    } catch {
      // Ignore parse errors
    }

    if (!response.ok) {
      console.error("Submit Error Details:", {
        status: response.status,
        statusText: response.statusText,
        responseText: responseText,
        errorData: errorData,
        url: response.url,
        sentPayload: payload,
      });

      if (response.status === 500) {
        const errorDetail =
          errorData?.message || responseText || "Không có thông tin chi tiết";
        throw new Error(
          "Lỗi máy chủ khi lưu kết quả. Vui lòng kiểm tra:\n" +
            "1. Định dạng dữ liệu có đúng không?\n" +
            `2. ID scoreband '${scoreBandId}' có tồn tại không?\n` +
            "3. Tất cả các trường bắt buộc đã được điền chưa?\n" +
            `4. Chi tiết lỗi: ${errorDetail}`
        );
      }

      throw new Error(
        errorData?.message ||
          `Lỗi gửi kết quả Quiz (${response.status}): ${responseText || response.statusText}`
      );
    }

    return { success: true };
  } catch (error: unknown) {
    console.error("Submit quiz error:", {
      error,
      type: error instanceof Error ? "Error" : typeof error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      payload: {
        accountId,
        resultsCount: results.length,
        totalPoint,
        scoreBandId,
      },
    });

    if (error instanceof TypeError) {
      throw new Error(
        "Không thể kết nối đến máy chủ. Vui lòng kiểm tra:\n" +
          "1. Máy chủ đã được khởi động chưa?\n" +
          "2. URL máy chủ có đúng không? (" +
          API_CONFIG.baseURL +
          ")\n" +
          "3. CORS đã được cấu hình đúng trên máy chủ chưa?"
      );
    }

    throw error;
  }
};
