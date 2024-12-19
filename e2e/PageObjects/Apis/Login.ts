import { test, expect, Browser, Page, chromium, request, APIRequest, APIRequestContext, APIResponse} from '@playwright/test';

export class Login {
    private token: string;
    private baseRequest: APIRequestContext;
    private loginCookie: { 
        name: string; 
        value: string; 
        path?: string; 
        secure?: boolean; 
        httpOnly?: boolean; 
        sameSite?: string; 
    } | null;
    public validateCookie: { 
        name: string; 
        value: string; 
        path?: string; 
        secure?: boolean; 
        httpOnly?: boolean; 
        sameSite?: string; 
    } | null;

    public async init() {
        // Initialize the base API request context
        this.baseRequest = await request.newContext({
            baseURL: 'https://opensource-demo.orangehrmlive.com',
        });
    }

    //Login Api Is Triggered to Generate the 1st setCookie (Response Headers),
    //Token is also captured (Response Body)
    public async login() {
        this.baseRequest = await request.newContext({
        baseURL: 'https://opensource-demo.orangehrmlive.com/'});
    
    const loginResponse = this.baseRequest.get('web/index.php/auth/login', {
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'en-US',
            'Connection': 'keep-alive',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.33 Safari/537.36',
            'sec-ch-ua': '"Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
    });
    const setCookieHeader  = (await loginResponse).headers()['set-cookie'];
    const responseBody = (await (await loginResponse).body()).toString();

    const tokenRegex = /token="&quot;([^&]+)&quot;/g; 

    const matches: string[] = []; 
    let match: RegExpExecArray | null;
    while ((match = tokenRegex.exec(responseBody)) !== null) {
        matches.push(match[1]);
    }

    //Token
     this.token = matches.toString();
    //cookie
     this.loginCookie = this.parseSetCookieHeader(setCookieHeader);
    }

    //Validate Api is triggered to Generate the 2nd setCookie (Respone Headers) 
    //which is used for authentication
    public async validate() {
        const validateResponse = await this.baseRequest.post('web/index.php/auth/validate', {
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'en-US',
                'Cache-Control': 'max-age=0',
                'Connection': 'keep-alive',
                'Content-Length': '165',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': `${this.loginCookie?.name}=${this.loginCookie?.value}`,
                'Host': 'opensource-demo.orangehrmlive.com',
                'Origin': 'https://opensource-demo.orangehrmlive.com',
                'Referer': 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.33 Safari/537.36',
                'sec-ch-ua': '"Chromium";v="131", "Not_A Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"'
            },
            form: {
                '_token': this.token,
                'username': 'Admin',
                'password': 'admin123'
                },
                maxRedirects: 0,
        });

        const setCookieHeader = validateResponse.headers()['set-cookie'];
        //Autentication Cookie
        this.validateCookie = this.parseSetCookieHeader(setCookieHeader);

    }

    private parseSetCookieHeader(setCookieHeader: string): { 
        name: string; 
        value: string; 
        path?: string; 
        secure?: boolean; 
        httpOnly?: boolean; 
        sameSite?: string; 
    } | null {
        // Handle empty or invalid input
        if (!setCookieHeader) return null;
    
        // Split the Set-Cookie header into parts
        const parts: string[] = setCookieHeader.split('; ');
        const [nameValue, ...attributes]: string[] = parts;
    
        // Ensure nameValue exists and is valid
        if (!nameValue || !nameValue.includes('=')) return null;
    
        const [name, ...valueParts]: string[] = nameValue.split('=');
        const value = valueParts.join('='); // To handle values with '=' in them
    
        // Parse attributes
        const path = attributes.find(attr => attr.toLowerCase().startsWith('path='))?.split('=')[1];
        const secure = attributes.some(attr => attr.toLowerCase() === 'secure');
        const httpOnly = attributes.some(attr => attr.toLowerCase() === 'httponly');
        const sameSite = attributes.find(attr => attr.toLowerCase().startsWith('samesite='))?.split('=')[1];
    
        return { 
            name: name.trim(), 
            value: value.trim(), 
            path, 
            secure, 
            httpOnly, 
            sameSite 
        };
    }

}