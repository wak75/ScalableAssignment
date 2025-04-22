package com.sap.medicine.scalble.Medicine.controller;

import com.sap.medicine.scalble.Medicine.service.MedicineNameService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MedicineController {
  MedicineNameService medicineNameService;

  public MedicineController(MedicineNameService medicineNameService) {
    this.medicineNameService = medicineNameService;
  }

  @GetMapping("/getMedicineDetails")
  public List<String> getMedicineDetails() {
    return medicineNameService.getMedicineName();
  }
}
