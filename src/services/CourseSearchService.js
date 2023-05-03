export class CourseSearchResult{
    courseName = "";
    instructor = "";
    semester = "";
    source = "";
}





export class CourseSearchService{
    courses = [
        {
          "courseName": "Introduction to Psychology",
          "instructor": "Dr. Sarah Lee",
          "semester": "Spring 2023",
          "source": "Stanford University"
        },
        {
          "courseName": "Organic Chemistry",
          "instructor": "Dr. Michael Chen",
          "semester": "Fall 2022",
          "source": "University of California, Los Angeles"
        },
        {
          "courseName": "American History",
          "instructor": "Dr. David Johnson",
          "semester": "Summer 2023",
          "source": "Yale University"
        },
        {
          "courseName": "Introduction to Machine Learning",
          "instructor": "Dr. Emily Wang",
          "semester": "Spring 2024",
          "source": "Massachusetts Institute of Technology"
        },
        {
          "courseName": "World Religions",
          "instructor": "Dr. Mark Garcia",
          "semester": "Fall 2023",
          "source": "Princeton University"
        },
        {
          "courseName": "Environmental Science",
          "instructor": "Dr. Sophia Chen",
          "semester": "Spring 2023",
          "source": "University of California, Santa Barbara"
        },
        {
          "courseName": "Introduction to Ethics",
          "instructor": "Dr. Rebecca Smith",
          "semester": "Fall 2022",
          "source": "Harvard University"
        },
        {
          "courseName": "Linear Algebra",
          "instructor": "Dr. Daniel Lee",
          "semester": "Spring 2024",
          "source": "Massachusetts Institute of Technology"
        },
        {
          "courseName": "Modern Physics",
          "instructor": "Dr. Michael Johnson",
          "semester": "Summer 2023",
          "source": "University of Chicago"
        },
        {
          "courseName": "Introduction to Linguistics",
          "instructor": "Dr. Elizabeth Kim",
          "semester": "Fall 2023",
          "source": "University of California, San Diego"
        },
        {
          "courseName": "Introduction to Finance",
          "instructor": "Dr. Kevin Lee",
          "semester": "Spring 2024",
          "source": "New York University"
        },
        {
          "courseName": "International Relations",
          "instructor": "Dr. Rachel Jones",
          "semester": "Fall 2022",
          "source": "Columbia University"
        },
        {
          "courseName": "Organizational Behavior",
          "instructor": "Dr. Matthew Kim",
          "semester": "Summer 2023",
          "source": "University of Pennsylvania"
        },
        {
          "courseName": "Introduction to Art History",
          "instructor": "Dr. Sarah Lee",
          "semester": "Spring 2023",
          "source": "University of California, Berkeley"
        },
        {
          "courseName": "Human Anatomy",
          "instructor": "Dr. Lisa Johnson",
          "semester": "Fall 2023",
          "source": "Johns Hopkins University"
        },
        {
          "courseName": "Political Philosophy",
          "instructor": "Dr. Samuel Lee",
          "semester": "Spring 2024",
          "source": "University of Oxford"
        }
    ]

    async delay(time = 300){
        await new Promise(resolve => setTimeout(resolve, time))
    }

    async seachCourses(searchTerm) {
        // await this.delay(760);
        if(searchTerm === "") return []

        return this.courses.filter((course)=>{
            return course.courseName.toLowerCase().includes(searchTerm);
        })
    }
}