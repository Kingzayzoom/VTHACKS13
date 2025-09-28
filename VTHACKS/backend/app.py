import requests

url = "https://api.rentcast.io/v1/properties?address=5500%20Grand%20Lake%20Dr%2C%20San%20Antonio%2C%20TX%2C%2078244"

headers = {
    "accept": "application/json",
    "X-Api-Key": "1431159103f94c91885b7a7377d66d1b"
}

response = requests.get(url, headers=headers)

print(response.text)