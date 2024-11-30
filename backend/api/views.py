from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

@csrf_exempt
def test_api_view(request):
    if request.method == 'POST':
        try:
            print("Raw request body:", request.body)
            # Parse the JSON body
            data = json.loads(request.body)
            print("Parsed data:", data)  
            # Extract 'name' and 'email' from the request
            name = data.get('name', 'Anonymous')  # Default to 'Anonymous' if 'name' is not provided
            email = data.get('email', 'No Email Provided')  # Default if 'email' is missing

            # Return a custom message including name and email
            return JsonResponse({
                "message": f"Hello, {name}! Your email is {email}.",
                "status": "success",
            })
        except json.JSONDecodeError:
            return JsonResponse(
                {"message": "Invalid JSON", "status": "error"},
                status=400
            )

    # Default GET response
    return JsonResponse({"message": "Hello from Django!", "status": "success"})
