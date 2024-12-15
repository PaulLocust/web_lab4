package helpers

import "math"

func Hit(x, y, r float64) bool {
	return inRect(x, y, r) || inTriangle(x, y, r) || inCircle(x, y, r)
}

func inRect(x, y, r float64) bool {
	return (-r <= x && x <= 0) && (0 <= y && y <= r)
}

func inTriangle(x, y, r float64) bool {
	return (0 <= x && x <= r) && (0 <= y && y <= 0.5*r) && (y+0.5*(x-r) <= 0)
}

func inCircle(x, y, r float64) bool {
	return (-0.5*r <= x && x <= 0) && (-0.5*r <= y && y <= 0) && ((math.Pow(x, 2) + math.Pow(y, 2) - math.Pow(0.5*r, 2)) <= 0)
}
