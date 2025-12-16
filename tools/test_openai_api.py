#!/usr/bin/env python3
"""
Test OpenAI API Key
"""

import os
import sys
import requests
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Key from user
API_KEY = "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"

def test_openai_api():
    """Test OpenAI API with a simple request"""
    url = "https://api.openai.com/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "gpt-4",
        "messages": [
            {
                "role": "user",
                "content": "Say hello in one sentence."
            }
        ],
        "max_tokens": 50
    }
    
    try:
        print("Testing OpenAI API...")
        print(f"URL: {url}")
        print(f"Model: {payload['model']}")
        
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        
        print(f"\nStatus Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            content = data['choices'][0]['message']['content']
            print(f"\n✅ API Key is VALID!")
            print(f"\nResponse: {content}")
            print(f"\nFull Response Structure:")
            print(json.dumps(data, indent=2)[:500])
            return True
        else:
            print(f"\n❌ API Key test FAILED")
            print(f"Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"\n❌ Error testing API: {str(e)}")
        return False

def test_scenario_query():
    """Test with a realistic scenario query"""
    url = "https://api.openai.com/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Test with actual comparison scenario
    payload = {
        "model": "gpt-4",
        "messages": [
            {
                "role": "system",
                "content": "You are a medical AI assistant helping with oncology treatment decisions."
            },
            {
                "role": "user",
                "content": "A patient with MBD4 homozygous loss is receiving carboplatin for ovarian cancer. What toxicity concerns should I be aware of?"
            }
        ],
        "max_tokens": 200
    }
    
    try:
        print("\n" + "="*60)
        print("Testing Real Scenario Query...")
        print("="*60)
        
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            content = data['choices'][0]['message']['content']
            print(f"\n✅ Scenario Query SUCCESS!")
            print(f"\nGPT Response:")
            print("-" * 60)
            print(content)
            print("-" * 60)
            return content
        else:
            print(f"\n❌ Scenario Query FAILED: {response.text}")
            return None
            
    except Exception as e:
        print(f"\n❌ Error in scenario query: {str(e)}")
        return None

if __name__ == "__main__":
    print("OpenAI API Key Test")
    print("=" * 60)
    
    # Test 1: Basic connectivity
    basic_test = test_openai_api()
    
    if basic_test:
        # Test 2: Realistic scenario
        scenario_response = test_scenario_query()
        
        if scenario_response:
            print("\n" + "="*60)
            print("✅ All tests passed! API key is ready for use.")
            print("="*60)
        else:
            print("\n⚠️ Basic test passed but scenario test failed.")
    else:
        print("\n❌ API key test failed. Please check the key.")
        sys.exit(1)


"""
Test OpenAI API Key
"""

import os
import sys
import requests
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Key from user
API_KEY = "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"

def test_openai_api():
    """Test OpenAI API with a simple request"""
    url = "https://api.openai.com/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "gpt-4",
        "messages": [
            {
                "role": "user",
                "content": "Say hello in one sentence."
            }
        ],
        "max_tokens": 50
    }
    
    try:
        print("Testing OpenAI API...")
        print(f"URL: {url}")
        print(f"Model: {payload['model']}")
        
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        
        print(f"\nStatus Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            content = data['choices'][0]['message']['content']
            print(f"\n✅ API Key is VALID!")
            print(f"\nResponse: {content}")
            print(f"\nFull Response Structure:")
            print(json.dumps(data, indent=2)[:500])
            return True
        else:
            print(f"\n❌ API Key test FAILED")
            print(f"Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"\n❌ Error testing API: {str(e)}")
        return False

def test_scenario_query():
    """Test with a realistic scenario query"""
    url = "https://api.openai.com/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Test with actual comparison scenario
    payload = {
        "model": "gpt-4",
        "messages": [
            {
                "role": "system",
                "content": "You are a medical AI assistant helping with oncology treatment decisions."
            },
            {
                "role": "user",
                "content": "A patient with MBD4 homozygous loss is receiving carboplatin for ovarian cancer. What toxicity concerns should I be aware of?"
            }
        ],
        "max_tokens": 200
    }
    
    try:
        print("\n" + "="*60)
        print("Testing Real Scenario Query...")
        print("="*60)
        
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            content = data['choices'][0]['message']['content']
            print(f"\n✅ Scenario Query SUCCESS!")
            print(f"\nGPT Response:")
            print("-" * 60)
            print(content)
            print("-" * 60)
            return content
        else:
            print(f"\n❌ Scenario Query FAILED: {response.text}")
            return None
            
    except Exception as e:
        print(f"\n❌ Error in scenario query: {str(e)}")
        return None

if __name__ == "__main__":
    print("OpenAI API Key Test")
    print("=" * 60)
    
    # Test 1: Basic connectivity
    basic_test = test_openai_api()
    
    if basic_test:
        # Test 2: Realistic scenario
        scenario_response = test_scenario_query()
        
        if scenario_response:
            print("\n" + "="*60)
            print("✅ All tests passed! API key is ready for use.")
            print("="*60)
        else:
            print("\n⚠️ Basic test passed but scenario test failed.")
    else:
        print("\n❌ API key test failed. Please check the key.")
        sys.exit(1)



