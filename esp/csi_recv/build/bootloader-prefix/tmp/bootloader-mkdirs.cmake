# Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
# file Copyright.txt or https://cmake.org/licensing for details.

cmake_minimum_required(VERSION 3.5)

file(MAKE_DIRECTORY
  "/home/singh/esp/esp-idf/components/bootloader/subproject"
  "/home/singh/dev/espmagic/esp-csi/examples/get-started/csi_recv/build/bootloader"
  "/home/singh/dev/espmagic/esp-csi/examples/get-started/csi_recv/build/bootloader-prefix"
  "/home/singh/dev/espmagic/esp-csi/examples/get-started/csi_recv/build/bootloader-prefix/tmp"
  "/home/singh/dev/espmagic/esp-csi/examples/get-started/csi_recv/build/bootloader-prefix/src/bootloader-stamp"
  "/home/singh/dev/espmagic/esp-csi/examples/get-started/csi_recv/build/bootloader-prefix/src"
  "/home/singh/dev/espmagic/esp-csi/examples/get-started/csi_recv/build/bootloader-prefix/src/bootloader-stamp"
)

set(configSubDirs )
foreach(subDir IN LISTS configSubDirs)
    file(MAKE_DIRECTORY "/home/singh/dev/espmagic/esp-csi/examples/get-started/csi_recv/build/bootloader-prefix/src/bootloader-stamp/${subDir}")
endforeach()
if(cfgdir)
  file(MAKE_DIRECTORY "/home/singh/dev/espmagic/esp-csi/examples/get-started/csi_recv/build/bootloader-prefix/src/bootloader-stamp${cfgdir}") # cfgdir has leading slash
endif()
