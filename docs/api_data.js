define({ "api": [
  {
    "type": "get",
    "url": "/policies",
    "title": "policies",
    "name": "policies",
    "description": "<p>aggregated policies for each user</p>",
    "group": "policies",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>user's id (ObjectId)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    user_id : \"5e9360445a35926560b7e351\"\n}",
          "type": "Object"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Array",
            "optional": false,
            "field": "policyAggregate",
            "description": "<p>policy data for the particular user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n\t{\n  \"5e9360445a35926560b7e351\": {\n    \"_id\": \"5e8ea34bb7dff531a7409ba5\",\n    \"policy_number\": \"YEEX9MOIBU7X\",\n    \"policy_type\": \"Single\",\n    \"policy_start_date\": \"2018-11-02\",\n    \"policy_end_date\": \"2019-11-02\",\n    \"user_id\": \"5e8ea34bb7dff531a7409ba4\",\n    \"company_id\": \"5e8ea34ba2897aa75f479863\",\n    \"policy_category_id\": \"5e8ea34ba2897aa75f479865\",\n    \"createdAt\": \"2020-04-09T04:23:39.696Z\",\n    \"updatedAt\": \"2020-04-09T04:23:39.696Z\",\n    \"__v\": 0\n  }\n}",
          "type": "Array"
        }
      ]
    },
    "filename": "routes/policies.js",
    "groupTitle": "policies"
  },
  {
    "type": "post",
    "url": "/schedule",
    "title": "schedule",
    "name": "schedule",
    "description": "<p>schedule message to be written in db at particular time and date</p>",
    "group": "policies",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "date",
            "description": "<p>nested object.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "date[year]",
            "description": "<p>year (min current year and max next year).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "date[month]",
            "description": "<p>month (month starts from 0 [jan] and ends in 11 [dec]).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "date[day]",
            "description": "<p>day (min 1, max 31).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "date[hour]",
            "description": "<p>hour (min 0, max 23).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "date[minute]",
            "description": "<p>minute (min 0, max 59).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "date[second]",
            "description": "<p>second (min 0, max 59).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\t{\n\t\"date\": {\n\t\t\"year\":2020,\n\t\t\"month\": 3,\n\t\t\"day\": 13,\n\t\t\"hour\": 0,\n\t\t\"minute\": 9,\n\t\t\"second\": 0\n\t    },\n\t \"message\": \"string is very good\"\n }",
          "type": "Object"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "successMessage",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\nstatus: 200,\nmessage: \"success\"\n}",
          "type": "Object"
        }
      ]
    },
    "filename": "routes/schedule.js",
    "groupTitle": "policies"
  },
  {
    "type": "get",
    "url": "/search",
    "title": "search",
    "name": "search",
    "group": "policies",
    "description": "<p>search user policy</p>",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>user's firstname.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\"username\": \"5e9360445a35926560b7e351\"\n}",
          "type": "Object"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "policyDetails",
            "description": ""
          }
        ]
      }
    },
    "filename": "routes/search.js",
    "groupTitle": "policies"
  },
  {
    "type": "post",
    "url": "/upload",
    "title": "upload",
    "name": "upload",
    "group": "policies",
    "version": "0.1.0",
    "description": "<p>upload data to be inserted into the database (multipart formdata. key: 'file')</p>",
    "filename": "routes/upload.js",
    "groupTitle": "policies"
  }
] });
